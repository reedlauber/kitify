class KitController < ApplicationController
  def index
    @user = User.where("username = ?", params[:username]).first
    
    if (@user == nil)
      render "notfound"
    else
      @kit = Kit.where("slug = ?", params[:slug].downcase).first

      if (@kit == nil)
        render "notfound"
      else
        @editable = params[:token] != nil && params[:token] == @kit.token

        @items = Item.where("kit_id = ?", @kit.id)
      end
    end
  end
  
  def new
  end
  
  def create
    if (params[:title] != nil)
      user_id = nil
      username = ''
      if(cookies[:username] != nil)
        user = User.where("username = ?", cookies[:username]).first
        if(user != nil)
          user_id = user.id
          username = user.username
        end
      end
      
      if(user_id == nil)
        user = User.new
        user.username = User.generate_unique_username
        user.save
        user_id = user.id
        cookies[:username] = { :value => user.username, :expires => 1.year.from_now }
        username = user.username
      end
      
      kit = Kit.new
      kit.title = params[:title]
      kit.user_id = user_id
      kit.token = Kit.generate_unique_token!
      kit.generate_slug
      kit.save
      
      redirect_to "/#{username}/#{kit.slug}/#{kit.token}"
    else
      render "new"
    end
  end
  
  def update
    kit = Kit.where("slug = ? AND token = ?", params[:slug].downcase, params[:token]).first
    
    if(kit == nil)
      render :json => { :success => false, :message => "Could not find kit." }
    else
      if(params[:title] != nil && params[:title] != kit.title)
        kit.title = params[:title]
        kit.generate_slug
        kit.save
      end
      
      render :json => kit
    end
  end
end
