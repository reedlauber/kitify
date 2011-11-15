class ItemController < ApplicationController
  def create
    item = nil
    
    if(params[:id] != nil)
      item = Item.where("id = ?", params[:id])
    else
      item = Item.new
      item.kit_id = params[:kit_id]
    end
    
    item.name = params[:name]
    item.quantity = params[:quantity].to_i
    item.merchant_url = params[:merchant_url]
    item.price = params[:price].to_d
    item.notes = params[:notes]
    
    item.save
    
    render :json => item
  end
  
  def destroy
    item = Item.find(params[:id])
    
    if(item != nil)
      item.delete
      render :json => { :success => true, :id => item.id }
    else
      render :json => { :success => false, :message => "Item not found." }
    end
  end
end
