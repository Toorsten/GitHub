package ch.loyalty.dgc.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import ch.loyalty.dgc.dao.CardDao;
import ch.loyalty.dgc.domain.Card;
import ch.loyalty.dgc.service.CardService;


@Service
public class CardServiceImpl implements CardService
{

	@Autowired
	private CardDao cardDao;

	@Override
	@Transactional(readOnly = false, propagation = Propagation.REQUIRED)
	public void create(Card entity)
	{
		cardDao.add(entity);
	}

	@Override
	@Transactional(readOnly = false, propagation = Propagation.REQUIRED)
	public void edit(Card entity)
	{
		cardDao.edit(entity);
	}

	@Override
	@Transactional(readOnly = false, propagation = Propagation.REQUIRED)
	public void delete(Long id)
	{
		cardDao.delete(id);
	}

	@Override
	@Transactional(readOnly = true, propagation = Propagation.REQUIRED)
	public Card findById(Long id)
	{
		return cardDao.findById(id);
	}

	@Override
	@Transactional(readOnly = true, propagation = Propagation.REQUIRED)
	public List<Card> findAll()
	{
		return cardDao.findAll();
	}

	@Override
	@Transactional(readOnly = true, propagation = Propagation.REQUIRED)
	public Card findByCardNumber(long cardNumber)
	{
		return cardDao.findByCardNumber(cardNumber);
	}

	@Override
	@Transactional(readOnly = true, propagation = Propagation.REQUIRED)
	public Card findByActivationLinkId(long activationLinkId)
	{
		return cardDao.findByActivationLinkId(activationLinkId);
	}
}
