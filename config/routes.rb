Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :photos do
    resources :photo_users
  end
  resources :users do
    resources :photos
    resources :photo_users
  end

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/auth/facebook/callback' => 'sessions#create'
  post '/logout' => 'sessions#destroy'


  # get '/users/:user_id/collection', to: 'photo_users#index', as: :photo_users

  root 'welcome#home'
end
