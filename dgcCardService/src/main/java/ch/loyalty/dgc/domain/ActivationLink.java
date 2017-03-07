package ch.loyalty.dgc.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "activation_link")
public class ActivationLink
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "activation_link_id")
	private int activationLinkId;
	@Column(name = "activation_link_url")
	private String activationLinkUrl;

	public String getActivationLinkUrl()
	{
		return activationLinkUrl;
	}

	public void setActivationLinkUrl(String activationLinkUrl)
	{
		this.activationLinkUrl = activationLinkUrl;
	}

	public int getActivationLinkId()
	{
		return activationLinkId;
	}

}
