class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  layout :determine_layout

  private

  def current_user
    @current_user ||=User.find(session[:user_id]) if session[:user_id]
  end

  def logged_in?
    !!current_user
  end

  def require_login
    if !logged_in?
      redirect_to login_path
    end
  end

  def determine_layout
    if logged_in?
      "logged_in"
    else
      "application"
    end
  end

end
