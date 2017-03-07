package ch.loyalty.dgc.dao.impl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import ch.loyalty.dgc.dao.ActivationLinkDao;
import ch.loyalty.dgc.domain.ActivationLink;


@Repository
public class ActivationLinkDaoImpl implements ActivationLinkDao
{
	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public void add(ActivationLink entity)
	{
		sessionFactory.getCurrentSession().save(entity);
	}

	@Override
	public void edit(ActivationLink entity)
	{
		sessionFactory.getCurrentSession().update(entity);
	}

	@Override
	public void delete(Long id)
	{
		sessionFactory.getCurrentSession().delete(findById(id));
	}

	@Override
	public ActivationLink findById(Long id)
	{
		return sessionFactory.getCurrentSession().get(ActivationLink.class, id);
	}

	@Override
	public List<ActivationLink> findAll()
	{
		return sessionFactory.getCurrentSession().createQuery("FROM ActivationLink").list();
	}

	@Override
	public ActivationLink findByActivationLinkUrl(String activationLinkUrl)
	{
		return (ActivationLink) sessionFactory.getCurrentSession().createQuery("FROM ActivationLink WHERE activationLinkUrl = :activationLinkUrl")
				.setParameter("activationLinkUrl", activationLinkUrl).uniqueResult();
	}

}
