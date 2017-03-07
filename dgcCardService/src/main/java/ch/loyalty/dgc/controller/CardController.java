package ch.loyalty.dgc.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import ch.loyalty.dgc.domain.ActivationLink;
import ch.loyalty.dgc.domain.AuthenticationRequest;
import ch.loyalty.dgc.domain.AuthenticationResponse;
import ch.loyalty.dgc.domain.Card;
import ch.loyalty.dgc.domain.TransactionRequest;
import ch.loyalty.dgc.domain.TransactionResponse;
import ch.loyalty.dgc.exception.CardServiceException;
import ch.loyalty.dgc.service.ActivationLinkService;
import ch.loyalty.dgc.service.CardService;
import ch.loyalty.dgc.util.ErrorResponseConstants;


@RestController
@RequestMapping(value = "/cardService/card")
public class CardController
{
	private static final Logger logger = LoggerFactory.getLogger("infoLogger");

	@Autowired
	private RestTemplate restTemplate;
	@Autowired
	private CardService cardService;
	@Autowired
	private ActivationLinkService activationLinkService;
	@Autowired
	private Environment environment;

	@RequestMapping(value = "/create", method = RequestMethod.POST, consumes = "application/json")
	public void create(@RequestBody Card card)
	{
		logger.info("Request: " + card);

		cardService.create(card);
	}

	@RequestMapping(value = "/edit/{id}", method = RequestMethod.PUT, consumes = "application/json")
	public void edit(@PathVariable("id") Long id, @RequestBody Card card)
	{
		logger.info("edit card by id: " + id + " Request: " + card);

		Card currentCard = cardService.findById(id);

		if (currentCard == null)
		{
			throw new CardServiceException(HttpStatus.NOT_FOUND.value(), "Card with id " + id + " not found");
		}
		else
		{
			currentCard.setCardDedication(card.getCardDedication());
			cardService.edit(currentCard);
		}

	}

	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable("id") Long id)
	{
		logger.info("delete card by id: " + id);

		cardService.delete(id);
	}

	@RequestMapping(value = "/find/{id}", method = RequestMethod.GET, produces = "application/json")
	public Card findById(@PathVariable("id") Long id)
	{
		logger.info("find card by id: " + id);

		if (cardService.findById(id) == null)
		{
			throw new CardServiceException(HttpStatus.NOT_FOUND.value(), "Card with id " + id + " not found");
		}
		return cardService.findById(id);
	}

	@RequestMapping(value = "/findAll", method = RequestMethod.GET, produces = "application/json")
	public List<Card> findAll()
	{
		logger.info("find all cards");

		List<Card> cards = cardService.findAll();

		if (cards == null)
		{
			throw new CardServiceException(HttpStatus.NOT_FOUND.value(), "No cards found");
		}
		else
		{
			return cards;
		}
	}

	@RequestMapping(value = "/findByCardNumber/{cardNumber}", method = RequestMethod.GET, produces = "application/json")
	public Card findByCardNumber(@PathVariable("cardNumber") Long cardNumber)
	{
		logger.info("find card by cardNumber: " + cardNumber);

		Card card = cardService.findByCardNumber(cardNumber);

		if (card == null)
		{
			throw new CardServiceException(HttpStatus.NOT_FOUND.value(), "Card with number " + cardNumber + " not found");
		}
		else
		{
			return card;
		}
	}

	@RequestMapping(value = "/getActivationLinkByCardId", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
	public ActivationLink getActivationLinkByCardId(@RequestBody Card card)
	{
		final String uri = environment.getProperty("resttemplate.giftcardserver.doTrans.uri");
		Card currentCard = new Card();

		TransactionRequest request = new TransactionRequest();
		request.setCardId(card.getCardNumber());
		request.setTransTypeId(20);

		TransactionResponse response = restTemplate.postForObject(uri, request, TransactionResponse.class);

		if (response.getStatusCode() == 0)
		{
			if (response.getCardStateId() == 7)
			{
				if (cardService.findByCardNumber(card.getCardNumber()) == null)
				{
					logger.info("get activationlink for card with cardnumber: " + card.getCardNumber());

					currentCard.setCardNumber(card.getCardNumber());
					currentCard.setDomainId(card.getDomainId());
					currentCard.setCardDedication(card.getCardDedication());
					currentCard.setActivationLink(activationLinkService.generateActivationLink(currentCard.getCardNumber()));

					cardService.create(currentCard);
				}
				else
				{
					throw new CardServiceException(HttpStatus.CONFLICT.value(), "Card " + card.getCardNumber() + " has already an activationlink");
				}
			}
			else
			{
				throw new CardServiceException(ErrorResponseConstants.CODE_WRONG_CARD_STATE, ErrorResponseConstants.MSG_WRONG_CARD_STATE);
			}
		}
		else
		{
			throw new CardServiceException(response.getStatusCode(), response.getStatusMsg());
		}

		return currentCard.getActivationLink();
	}

	@RequestMapping(value = "/validateActivationLink", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
	@CrossOrigin(allowedHeaders = "*")
	public AuthenticationResponse validateActivationLink(@RequestBody AuthenticationRequest authRequest)
	{
		logger.info("Request: " + authRequest);

		final String uri = environment.getProperty("resttemplate.giftcardserver.doTrans.uri");
		TransactionRequest transRequest = new TransactionRequest();
		TransactionResponse transResponse = new TransactionResponse();
		AuthenticationResponse authResponse = new AuthenticationResponse();

		ActivationLink currentActivationLink = activationLinkService.findByActivationLinkUrl(authRequest.getToken());

		if (currentActivationLink == null)
		{
			throw new CardServiceException(HttpStatus.UNAUTHORIZED.value(), authRequest.getToken() + " is no valid activation link");
		}
		else
		{
			Card currentCard = cardService.findByActivationLinkId(currentActivationLink.getActivationLinkId());

			if (currentCard.getCardNumber() == authRequest.getCardNumber())
			{
				transRequest.setCardId(currentCard.getCardNumber());
				transRequest.setTransTypeId(37);

				transResponse = restTemplate.postForObject(uri, transRequest, TransactionResponse.class);

				authResponse.setStatusCode(transResponse.getStatusCode());
				authResponse.setStatusMsg(transResponse.getStatusMsg());
				authResponse.setCardNumber(currentCard.getCardNumber());
			}
			else if (authRequest.getCardPin() != 0)
			{
				transRequest.setCardId(currentCard.getCardNumber());
				transRequest.setTransTypeId(37);
				transRequest.setCardPin(authRequest.getCardPin());

				transResponse = restTemplate.postForObject(uri, transRequest, TransactionResponse.class);

				authResponse.setStatusCode(transResponse.getStatusCode());
				authResponse.setStatusMsg(transResponse.getStatusMsg());
				authResponse.setCardNumber(currentCard.getCardNumber());
			}
			else
			{
				throw new CardServiceException(HttpStatus.UNAUTHORIZED.value(), "Wrong input, it does not match");
			}
		}

		return authResponse;
	}

}
