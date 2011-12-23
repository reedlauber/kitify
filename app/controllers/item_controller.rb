class ItemController < ApplicationController
  def index
    user = User.where("username = ?", params[:username]).first
    
    items = []
    
    if (user != nil)    
      kit = Kit.where("slug = ? AND user_id = ?", params[:slug].downcase, user.id).first
    
      if (kit != nil)
        items = Item.where("kit_id = ?", kit.id).order("created_at")
      end
    end
    
    render :json => items
  end
  
  def create
    user = User.where("username = ?", params[:username]).first
    
    if (user == nil)
      render :json => { :success => false, :message => "User couldn't be found" }
    else
      kit = Kit.where("slug = ? AND user_id = ? AND token = ?", params[:slug].downcase, user.id, params[:token]).first

      if (kit == nil)
        render :json => { :success => false, :message => "Kit couldn't be found." }
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
  end
  
  def update
    resp = { :success => false, :message => "Something went wrong." }
    
    user = User.where("username = ?", params[:username]).first
    
    if (user == nil)
      resp[:message] = "User couldn't be found"
    else
      kit = Kit.where("slug = ? AND user_id = ? AND token = ?", params[:slug].downcase, user.id, params[:token]).first

      if(kit == nil)
        resp[:message] = "Kit couldn't be found."
      else
        item = Item.where("id = ?", params[:id]).first

        if(item == nil)
          resp[:message] = "Item couldn't be found."
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
    end
    
    render :json => resp
  end
  
  def destroy
    resp = { :success => false, :message => "Something went wrong." }
    
    user = User.where("username = ?", params[:username]).first
    
    if (user == nil)
      resp[:message] = "User couldn't be found"
    else
      kit = Kit.where("slug = ? AND user_id = ? AND token = ?", params[:slug].downcase, user.id, params[:token]).first

      if(kit == nil)
        resp[:message] = "Kit couldn't be found."
      else
        item = Item.find(params[:id])
        
        if (item == nil)
          resp[:message] = "Item couldn't be found."
        else
          item.delete
          resp = { :success => true, :id => item.id }
        end
      end
    end
    
    render :json => resp
  end
end
