class KitController < ApplicationController
  def index
    @kit = Kit.where("slug = ?", params[:slug]).first
    
    @items = Item.where("kit_id = ?", @kit.id)
  end
  
  def new
  end
  
  def create
    if(params[:title] != nil)
      kit = Kit.new
      kit.title = params[:title]
      kit.token = Kit.generate_unique_token!
      kit.save
      
      kit.generate_slug
      
      redirect_to "/#{kit.slug}/#{kit.token}"
    else
      render "new"
    end
  end
end
