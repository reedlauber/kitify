class FunnynameController < ApplicationController
  
  def index
    adjs = ['big', 'small', 'long', 'short', 'thick', 'narrow', 'deep', 'shallow', 'flat', 'fast',
            'slow','dark','bright','warm','hot','cool','cold','windy','noisy','loud',
            'quiet','silent','dry','wet','arid','damp','hard','soft','heavy','light',
            'strong','weak','tidy','fat','thin','old','young','sweet','sour','bitter',
            'salty','good','bad','useful','free','rich','poor','brave','sad','proud',
            'timid','timorous','happy','angry','clever','fair','polite','kind','busy','lazy',
            'fun','red','orange','yellow','green','blue','violet','purple','brown','black',
            'grey','tan','careful','daring','fierce','weird','round','flat','pointy','sharp',
            'blunt']
    
    nouns = ['marmot', 'chihuahua', 'platypus', 'ninja', 'pirate', 'sailboat', 'couch', 'pillow', 'blanket', 'lighthouse', 
              'chair', 'cat', 'dog', 'turtle', 'sloth', 'toad', 'candle', 'river', 'hill', 'hamburger', 'hotdog',
              'tree', 'bush', 'fountain', 'watefall', 'rug', 'window', 'finch', 'flower', 'elk', 'spider']
    
    rnd = Random.new
    
    @first = adjs[rnd.rand(adjs.count)]
    @second = adjs[rnd.rand(adjs.count)]
    @third = nouns[rnd.rand(nouns.count)]
  end
end
