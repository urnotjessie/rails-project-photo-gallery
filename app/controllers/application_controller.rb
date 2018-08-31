class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  layout :determine_layout

  def current_user
    User.find(session[:user_id])
  end

  def logged_in?
    !!current_user
  end

  private

  def determine_layout
    if logged_in?
      "logged_in"
    else
      "application"
    end
  end

end
