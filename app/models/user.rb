class User < ActiveRecord::Base
  has_many :kits
  
  @@adjs = ["angry", "arid", "bad", "big", "bitter", "black", "blue", "blunt", "brave", "bright", 
    "brown", "busy", "careful", "clever", "cold", "cool", "craggy", "damp", "daring", "dark", 
    "deep", "dry", "fair", "fast", "fat", "fierce", "flat", "flat", "free", "fun", 
    "fuzzy", "good", "green", "grey", "happy", "hard", "heavy", "hot", "kind", "lazy", 
    "light", "long", "loud", "narrow", "noisy", "old", "orange", "pointy", "polite", "poor", 
    "proud", "purple", "quiet", "red", "rich", "round", "sad", "salty", "shallow", "sharp", 
    "short", "silent", "slow", "small", "soft", "sour", "stiff", "strong", "sweet", "tan", 
    "thick", "thin", "tidy", "timid", "timorous", "useful", "violet", "warm", "weak", 
    "weird", "wet", "windy", "yellow", "young"]
  
  @@nouns = ["belt", "blanket", "brick", "bush", "candle", "cat", "chair", "chihuahua", "couch", "dog", 
    "dragon", "elk", "emu", "finch", "flower", "fountain", "hamburger", "hill", "hotdog", "igloo", 
    "lighthouse", "llama", "marmot", "ninja", "pants", "pillow", "pirate", "planet", "platypus", "river", 
    "rug", "sailboat", "salamander", "sloth", "socks", "spider", "star", "stone", "toad", "tree", 
    "turtle", "waterfall", "window"]
    
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
