package ch.loyalty.dgc.domain;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;


@Entity
@Table(name = "card")
public class Card
{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonIgnore
	@Column(name = "card_id", nullable = false)
	private long cardId;
	@JsonProperty("cardId")
	@Column(name = "card_number", unique = true, nullable = false)
	private long cardNumber;
	// @Column(name = "card_pin", nullable = false)
	// private int cardPin;
	// @Column(name = "card_state_id", nullable = false)
	// private int cardStateId;
	// @Column(name = "card_balance", nullable = false)
	// private BigDecimal cardBalance;
	@JsonProperty("dedication")
	@Column(name = "card_dedication")
	private String cardDedication;
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "activation_link_Id")
	private ActivationLink activationLink;
	@Column(name = "profile_id")
	private long profileId;
	@Column(name = "domain_id", nullable = false)
	private long domainId;

	public long getCardNumber()
	{
		return cardNumber;
	}

	public void setCardNumber(long cardNumber)
	{
		this.cardNumber = cardNumber;
	}

	public String getCardDedication()
	{
		return cardDedication;
	}

	public void setCardDedication(String cardDedication)
	{
		this.cardDedication = cardDedication;
	}

	public ActivationLink getActivationLink()
	{
		return activationLink;
	}

	public void setActivationLink(ActivationLink activationLink)
	{
		this.activationLink = activationLink;
	}

	public long getProfileId()
	{
		return profileId;
	}

	public void setProfileId(long profileId)
	{
		this.profileId = profileId;
	}

	public long getDomainId()
	{
		return domainId;
	}

	public void setDomainId(long domainId)
	{
		this.domainId = domainId;
	}

	public long getCardId()
	{
		return cardId;
	}

}
