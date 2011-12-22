class User < ActiveRecord::Base
  def self.generate_username
    chars = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    username = ''
    8.times { username << chars[rand(chars.size)] }
    username
  end
  
  def self.generate_unique_username!
    username = self.generate_username
  
    existing = self.where("username = '#{username}'")
  
    if(existing.count > 0)
      username = self.generate_unique_username!
    end
  
    username
  end
end
