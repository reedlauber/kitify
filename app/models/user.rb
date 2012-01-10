class User < ActiveRecord::Base
  has_many :kits
  
  @@adjs = ["big", "brave", "bright", "busy", "careful", "clever", "cool", "daring", "fair", "fierce", 
    "free", "fun", "fuzzy", "good", "green", "grey", "happy", "light", "long", "noisy", 
    "orange", "polite", "proud", "purple", "quiet", "red", "rich", "sharp", "silent", "strong", 
    "sweet", "tidy", "useful", "violet", "warm", "yellow", "young", "teal", "plaid", "grand", 
    "super", "stable", "thoughtful", "calm", "powerful"]
  
  @@nouns = ["cat", "chihuahua", "dragon", "elk", "emu", "finch", "flower", "fountain", "hamburger", "igloo", 
    "lighthouse", "llama", "marmot", "ninja", "pants", "pillow", "pirate", "planet", "platypus", "river", 
    "rug", "sailboat", "salamander", "sloth", "spider", "star", "stone", "tree", "turtle", "waterfall"]
    
  def self.generate_random_name num
    name = ''
    rnd = Random.new
    num.times do |i|
      name += '-' if name != ''
      if (i == num - 1)
        name += @@nouns[rnd.rand(@@nouns.count)]
      else
        name += @@adjs[rnd.rand(@@adjs.count)]
      end
    end
    name
  end
  
  def self.generate_username
    chars = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    username = ''
    8.times { username << chars[rand(chars.size)] }
    username
  end
  
  def self.generate_unique_username
    username = self.generate_random_name 3
  
    existing = self.where("username = '#{username}'")
  
    if(existing.count > 0)
      username = self.generate_unique_username
    end
  
    username
  end
end
