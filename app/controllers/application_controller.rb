class ApplicationController < ActionController::Base
  protect_from_forgery
  ActiveRecord::Base.include_root_in_json = false
  before_filter :load_user_kits
  
  def load_user_kits
    username = cookies[:username]
    
    if (username != nil)
      @user = User.where("username = ?", username).first
      
      if (@user != nil)
        @user_kits = Kit.where("user_id = ?", @user.id).order("updated_at DESC")
      end
    end
  end
end
