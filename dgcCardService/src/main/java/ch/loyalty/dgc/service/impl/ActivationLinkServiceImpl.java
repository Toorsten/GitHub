package ch.loyalty.dgc.service.impl;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import ch.loyalty.dgc.dao.ActivationLinkDao;
import ch.loyalty.dgc.domain.ActivationLink;
import ch.loyalty.dgc.service.ActivationLinkService;


@Service
public class ActivationLinkServiceImpl implements ActivationLinkService
{
	@Autowired
	private Environment environment;

	@Autowired
	private ActivationLinkDao activationLinkDao;

	@Override
	@Transactional(readOnly = false, propagation = Propagation.REQUIRED)
	public ActivationLink generateActivationLink(Long voucherNumber)
	{
		String url = environment.getProperty("activation-query.url.params");
		String token = UUID.randomUUID().toString();
		String activationLinkUrl = url + token;

		ActivationLink activationLink = new ActivationLink();
		activationLink.setActivationLinkUrl(activationLinkUrl);

		return activationLink;
	}

	@Override
	@Transactional(readOnly = true, propagation = Propagation.REQUIRED)
	public ActivationLink findByActivationLinkUrl(String token)
	{
		String url = environment.getProperty("activation-query.url.params");
		String activationLinkUrl = url + token;
		return activationLinkDao.findByActivationLinkUrl(activationLinkUrl);
	}

}
