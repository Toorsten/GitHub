package ch.loyalty.dgc.dao.impl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import ch.loyalty.dgc.dao.CardDao;
import ch.loyalty.dgc.domain.Card;


@Repository
public class CardDaoImpl implements CardDao
{

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public void add(Card entity)
	{
		sessionFactory.getCurrentSession().save(entity);
	}

	@Override
	public void edit(Card entity)
	{
		sessionFactory.getCurrentSession().update(entity);
	}

	@Override
	public void delete(Long id)
	{
		sessionFactory.getCurrentSession().delete(findById(id));
	}

	@Override
	public Card findById(Long id)
	{
		return sessionFactory.getCurrentSession().get(Card.class, id);
	}

	@Override
	public List<Card> findAll()
	{
		return sessionFactory.getCurrentSession().createQuery("FROM Card").list();
	}

	@Override
	public Card findByCardNumber(long cardNumber)
	{
		return (Card) sessionFactory.getCurrentSession().createQuery("FROM Card WHERE cardNumber = :cardNumber").setParameter("cardNumber", cardNumber)
				.uniqueResult();
	}

	@Override
	public Card findByActivationLinkId(long activationLinkId)
	{
		return (Card) sessionFactory.getCurrentSession().createQuery("FROM Card WHERE activation_link_id = :activationLinkId")
				.setParameter("activationLinkId", activationLinkId).uniqueResult();
	}

}
