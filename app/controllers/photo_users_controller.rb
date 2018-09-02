class PhotoUsersController < ApplicationController
  def new
    @photo = Photo.find(params[:photo_id])
    @photo_user = PhotoUser.new
  end

  def create
    @photo = Photo.find(params[:photo_id])

    @photo_user = PhotoUser.new(photo_user_params)
    @photo_user.collector_id = current_user.id
    @photo_user.photo_id = @photo.id
    if @photo_user.save
      redirect_to user_photo_users_path(current_user)
    else
      redirect_to user_photo_users_path(current_user)
    end
  end

  def index
    @user = current_user
  end

  def destroy
    @photo_user = PhotoUser.find_by(photo_id: params[:photo_id], collector_id: current_user.id)
    @photo_user.delete
    redirect_to root_path
  end

  private

  def photo_user_params
    params.require(:photo_user).permit(:label)
  end

end
