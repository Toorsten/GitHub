package ch.loyalty.dgc.service;

import java.io.Serializable;
import java.util.List;


public interface GenericService<T, PK extends Serializable>
{
	void create(T entity);

	void edit(T entity);

	void delete(PK id);

	T findById(PK id);

	List<T> findAll();
}
