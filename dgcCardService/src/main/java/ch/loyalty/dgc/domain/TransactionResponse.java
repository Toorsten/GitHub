package ch.loyalty.dgc.domain;

public class TransactionResponse
{
	private int statusCode;
	private String statusMsg;
	private int cardStateId;

	public int getStatusCode()
	{
		return statusCode;
	}

	public void setStatusCode(int statusCode)
	{
		this.statusCode = statusCode;
	}

	public int getCardStateId()
	{
		return cardStateId;
	}

	public void setCardStateId(int cardStateId)
	{
		this.cardStateId = cardStateId;
	}

	public String getStatusMsg()
	{
		return statusMsg;
	}

	public void setStatusMsg(String statusMsg)
	{
		this.statusMsg = statusMsg;
	}

}
