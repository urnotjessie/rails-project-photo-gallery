class SessionsController < ApplicationController
  def new
  end

  def create
    if auth_hash = request.env["omniauth.auth"]
      @user = User.find_or_create_by(uid: auth['uid']) do |u|
        u.username = auth['info']['name']
        u.email = auth['info']['email']
        u.password = SecureRandom.hex
      end
      session[:user_id] = @user.id
      redirect_to @user
    else
      @user = User.find_by(email: params[:email])

      if @user && @user.authenticate(params[:password])
        session[:user_id] = @user.id
        redirect_to @user
      else
        redirect_to '/'
      end
    end
  end

  def destroy
    if session[:user_id]
      session.delete :user_id
      redirect_to '/'
    else
      redirect_to '/'
    end
  end

  private

  def auth
    request.env['omniauth.auth']
  end

end
