class Kit < ActiveRecord::Base
  belongs_to :users
  has_many :items
  
  def self.generate_token
    chars = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    token = ''
    8.times { token << chars[rand(chars.size)] }
    token
  end
  
  def self.generate_unique_token!
    token = self.generate_token
    
    existing = self.where("token = '#{token}'")
    
    if(existing.count > 0)
      token = self.generate_unique_token!
    end
    
    token
  end
  
  def generate_slug 
    slug = self.title.gsub(/[^\w\s]/, '')
    slug = slug.gsub(/[\s]/, '-')
    limit = 255 - (self.id.to_s.length + 1)
    slug = slug[0, limit]
    slug.downcase!
    
    existing_count = Kit.where("slug = ?", slug).count
    
    if (existing_count > 0)
      slug = slug + "-" + (existing_count + 1).to_s
    end
    
    self.slug = slug
  end
end
