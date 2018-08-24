class PhotosController < ApplicationController
  def index
    @photos = Photo.all
  end

  def new
    if session[:user_id] != nil
        @photo = Photo.new(user_id: params[:user_id])
    end
  end

  def create
    @photo = Photo.new(photo_params)
    if @photo.save
      redirect_to photos_path
    else
      render :new
    end
  end

  private

  def photo_params
    params.require(:photo).permit(:caption, :image, :user_id)
  end
end
