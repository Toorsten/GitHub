package ch.loyalty.dgc.domain;

public class AuthenticationRequest
{
	private int cardPin;
	private long cardNumber;
	private String token;

	public int getCardPin()
	{
		return cardPin;
	}

	public void setCardPin(int cardPin)
	{
		this.cardPin = cardPin;
	}

	public long getCardNumber()
	{
		return cardNumber;
	}

	public void setCardNumber(long cardNumber)
	{
		this.cardNumber = cardNumber;
	}

	public String getToken()
	{
		return token;
	}

	public void setToken(String token)
	{
		this.token = token;
	}

}
