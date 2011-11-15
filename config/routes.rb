Kitify::Application.routes.draw do
  root :to => "home#index"
  
  get "/new" => "kit#new"
  post "/new" => "kit#create"
  
  get "/:slug(/:token)" => "kit#index"
  
  post "/items" => "item#create"
  delete "/items/:id" => "item#destroy"
end
