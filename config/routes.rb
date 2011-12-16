Kitify::Application.routes.draw do
  root :to => "home#index"
  
  get "/new" => "kit#new"
  post "/new" => "kit#create"
  
  post "/items/:id" => "item#update"
  post "/items" => "item#create"
  delete "/items/:id" => "item#destroy"
  
  get "/:slug/items" => "item#index"
  get "/:slug(/:token)" => "kit#index"
  post "/:slug/:token" => "kit#update"
end
