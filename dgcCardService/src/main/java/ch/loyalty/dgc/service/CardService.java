package ch.loyalty.dgc.service;

import ch.loyalty.dgc.domain.Card;


public interface CardService extends GenericService<Card, Long>
{
	Card findByCardNumber(long cardNumber);

	Card findByActivationLinkId(long activationlinkId);
}
