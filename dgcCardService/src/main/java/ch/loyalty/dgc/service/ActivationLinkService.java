package ch.loyalty.dgc.service;

import ch.loyalty.dgc.domain.ActivationLink;


public interface ActivationLinkService
{
	ActivationLink generateActivationLink(Long voucherNumber);
	
	ActivationLink findByActivationLinkUrl(String token);
}
