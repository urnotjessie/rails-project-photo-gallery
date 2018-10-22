class PhotosController < ApplicationController
  before_action :require_login
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
      @photo.image.purge_later
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
    @photo.image.purge_later
    if @photo.collectors != []
      @photo.collectors.each do |collect|
        @photo_user = PhotoUser.find_by(collector_id: collect.id, photo_id: @photo.id)
        @photo_user.delete
      end
    end
    redirect_to user_path(current_user)
  end

  private

  def photo_params
    params.require(:photo).permit(:caption, :image)
  end

end
