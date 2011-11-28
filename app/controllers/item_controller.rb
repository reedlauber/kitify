class ItemController < ApplicationController
  def index
    kit = Kit.where("slug = ?", params[:slug].downcase).first
    
    items = []
    
    if(kit != nil)
      items = Item.where("kit_id = ?", kit.id).order("created_at")
    end
    
    render :json => items
  end
  
  def create
    kit = Kit.where("slug = ?", params[:slug].downcase).first
    
    if(kit == nil)
      render :json => { :success => false, :message => "Kit not found." }
    else
      item = Item.new
      item.kit_id = kit.id
      item.name = params[:name]
      item.quantity = params[:quantity].to_i
      item.merchant_url = params[:merchant_url]
      item.price = params[:price].to_f
      item.notes = params[:notes]

      item.save

      render :json => item
    end
  end
  
  def update
    kit = Kit.where("id = ?", params[:kit_id]).first
    
    resp = nil
    
    if(kit == nil)
      resp = { :success => false, :message => "Kit not found." }
    else
      item = Item.where("id = ?", params[:id]).first
      
      if(item == nil)
        resp = { :success => false, :message => "Item not found." }
      else
        item.name = params[:name]
        item.quantity = params[:quantity].to_i
        item.merchant_url = params[:merchant_url]
        item.price = params[:price].to_f
        item.notes = params[:notes]
        item.save
        
        resp = item
      end
    end
    
    render :json => resp
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
