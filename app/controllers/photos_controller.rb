class PhotosController < ApplicationController
  before_action :require_login
  skip_before_action :require_login, only: [:index]

  def index
    @photos = Photo.all
  end

  def new
    @photo = Photo.new(user_id: params[:user_id])
  end

  def create
    @photo = Photo.new(photo_params)
    @photo.user_id = session[:user_id]
    if @photo.save
      redirect_to user_path(current_user)
    else
      render :new
    end
  end

  def destroy
    @photo = Photo.find(params[:id])
    @photo.delete
    redirect_to user_path(current_user)
  end

  private

  def photo_params
    params.require(:photo).permit(:caption, :image)
  end
end
