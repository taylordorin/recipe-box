Rails.application.routes.draw do
  devise_for :users
  root 'static_pages#index'

  get '/recipes/', to: 'static_pages#index'
  get '/recipes/*path', to: 'static_pages#index'
  get '/random', to: 'static_pages#index'

  namespace :api do
    namespace :v1 do
      # resources :users do
      #   resources :recipes
      # end
      resources :randoms, only: [:index]
      resources :recipes #, only: [:index, :show, :create]
      resources :recipes do
        resources :ingredients
        resources :directions
      end
    end
  end
end
