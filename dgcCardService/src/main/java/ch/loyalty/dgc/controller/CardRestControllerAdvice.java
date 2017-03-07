package ch.loyalty.dgc.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import ch.loyalty.dgc.exception.CardServiceException;
import ch.loyalty.dgc.exception.ErrorResponse;


@RestControllerAdvice
public class CardRestControllerAdvice
{
	private static final Logger logger = LoggerFactory.getLogger("errorLogger");

	@ExceptionHandler(CardServiceException.class)
	public ErrorResponse handleCardServiceException(CardServiceException ex)
	{
		logger.error(ex.getMessage());

		return new ErrorResponse(ex.getStatusCode(), ex.getMessage());
	}

	@ExceptionHandler(Exception.class)
	public ErrorResponse handleException(Exception ex)
	{
		logger.error(ex.getMessage());

		return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage());
	}
}
