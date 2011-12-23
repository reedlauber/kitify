Kitify::Application.routes.draw do
  root :to => "home#index"
  
  # get/create items
  get "/:username/:slug/items" => "item#index"
  post "/:username/:slug/items/:id" => "item#update"
  post "/:username/:slug/items" => "item#create"
  delete "/:username/:slug/items/:id" => "item#destroy"
  
  # funny name
  get "/funnyname" => "funnyname#index"
  
  # kit creation
  get "/new" => "kit#new"
  post "/new" => "kit#create"
  
  # get/update kit
  get "/:username/:slug(/:token)" => "kit#index"
  post "/:username/:slug/:token" => "kit#update"
end
