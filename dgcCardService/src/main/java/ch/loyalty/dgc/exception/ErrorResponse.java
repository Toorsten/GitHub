package ch.loyalty.dgc.exception;

public class ErrorResponse
{
	private int statusCode;
	private String statusMsg;

	public ErrorResponse(int statusCode, String statusMsg)
	{
		this.statusCode = statusCode;
		this.statusMsg = statusMsg;
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
