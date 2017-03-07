package ch.loyalty.dgc.dao;

import java.io.Serializable;
import java.util.List;


public interface GenericDao<T, PK extends Serializable>
{
	void add(T entity);

	void edit(T entity);

	void delete(PK entity);

	T findById(PK id);

	List<T> findAll();
}
