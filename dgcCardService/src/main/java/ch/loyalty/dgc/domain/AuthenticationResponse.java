package ch.loyalty.dgc.domain;

public class AuthenticationResponse
{
	private int statusCode;
	private String statusMsg;
	private long cardNumber;

	public long getCardNumber()
	{
		return cardNumber;
	}

	public void setCardNumber(long cardNumber)
	{
		this.cardNumber = cardNumber;
	}

	public int getStatusCode()
	{
		return statusCode;
	}

	public void setStatusCode(int statusCode)
	{
		this.statusCode = statusCode;
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
