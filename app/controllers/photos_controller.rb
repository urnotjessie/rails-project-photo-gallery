class PhotosController < ApplicationController
  before_action :require_login, :correct_creator
  skip_before_action :require_login, only: [:index]

  def new
    @photo = Photo.new(user_id: params[:user_id])
  end

  def create
    @photo = Photo.new(photo_params)
    @photo.user_id = session[:user_id]
    if @photo.save
      redirect_to user_path(current_user)
    else
      flash[:error] = @photo.errors.full_messages
      redirect_to new_user_photo_path(current_user)
    end
  end

  def edit
    @photo = Photo.find(params[:id])
  end

  def update
    @photo = Photo.find(params[:id])
    if @photo.update(caption: params[:photo][:caption])
      redirect_to user_path(current_user)
    else
      flash[:error] = @photo.errors.full_messages
      redirect_to edit_user_photo_path(current_user, @photo)
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

  def correct_creator
    @user = User.find(params[:user_id])
    redirect_to root_path unless current_user == @user
  end
  
end
