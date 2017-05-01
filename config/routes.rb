Rails.application.routes.draw do
  devise_for :users
  root 'static_pages#index'

  get '/recipes/*path', to: 'static_pages#index'

  namespace :api do
    namespace :v1 do
      resources :recipes, only: [:index, :show, :create]
    end
  end
end
