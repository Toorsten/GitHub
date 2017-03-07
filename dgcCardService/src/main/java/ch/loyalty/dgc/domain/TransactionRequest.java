package ch.loyalty.dgc.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;


public class TransactionRequest
{
	private long cardId;
	@JsonInclude(Include.NON_DEFAULT)
	private int cardPin;
	private int transTypeId;

	public long getCardId()
	{
		return cardId;
	}

	public void setCardId(long cardId)
	{
		this.cardId = cardId;
	}

	public int getTransTypeId()
	{
		return transTypeId;
	}

	public void setTransTypeId(int transTypeId)
	{
		this.transTypeId = transTypeId;
	}

	public int getCardPin()
	{
		return cardPin;
	}

	public void setCardPin(int cardPin)
	{
		this.cardPin = cardPin;
	}

}
