class PhotoUsersController < ApplicationController

  def new
    @photo = Photo.find(params[:photo_id])
    @photo_user = PhotoUser.new
  end

  def create
    @photo = Photo.find(params[:photo_id])

    @photo_user = PhotoUser.new(label: photo_user_label)
    @photo_user.collector_id = current_user.id
    @photo_user.photo_id = @photo.id
    if @photo_user.save
      redirect_to user_photo_users_path(current_user)
    else
      flash[:error] = @photo_user.errors.full_messages
      redirect_to user_photo_users_path(current_user)
    end
  end

  def index
    @user = current_user
  end

  def edit
    @photo_user = PhotoUser.find_by(photo_id: params[:id], collector_id: current_user.id)
    @photo = Photo.find(params[:id])
  end

  def update
    @photo_user = PhotoUser.find_by(photo_id: params[:photo_id], collector_id: current_user.id)
    @photo_user.update(label: photo_user_label)
    redirect_to user_photo_users_path(User.find(current_user.id))
  end

  def destroy
    @photo_user = PhotoUser.find_by(photo_id: params[:photo_id], collector_id: current_user.id)
    @photo_user.delete
    redirect_to user_photo_users_path(current_user)
  end

  private
  def photo_user_label
    if params[:photo_user][:other_label] != ""
      params[:photo_user][:other_label]
    else
      params[:photo_user][:label]
    end
  end

end
