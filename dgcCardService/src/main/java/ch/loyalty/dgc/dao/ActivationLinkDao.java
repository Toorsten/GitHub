package ch.loyalty.dgc.dao;

import ch.loyalty.dgc.domain.ActivationLink;


public interface ActivationLinkDao extends GenericDao<ActivationLink, Long>
{
	ActivationLink findByActivationLinkUrl(String activationLinkUrl);
}
