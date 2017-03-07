package ch.loyalty.dgc.exception;

public class CardServiceException extends RuntimeException
{
	private static final long serialVersionUID = 1L;
	private int statusCode;

	public CardServiceException(int statusCode, String statusMsg)
	{
		super(statusMsg);
		this.statusCode = statusCode;
	}

	public int getStatusCode()
	{
		return statusCode;
	}

	public void setStatusCode(int statusCode)
	{
		this.statusCode = statusCode;
	}

}
