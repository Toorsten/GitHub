package ch.loyalty.dgc.dao;

import ch.loyalty.dgc.domain.Card;

public interface CardDao extends GenericDao<Card, Long> {

	Card findByCardNumber(long cardNumber);
	
	Card findByActivationLinkId(long activationLinkId);
}
