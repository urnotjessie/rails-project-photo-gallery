class PhotoUsersController < ApplicationController
  def new
  end

  def create
    @photo = Photo.find(params[:photo])
    current_user.collected_photos.build(id:@photo.id)
    if current_user.save
      binding.pry
      redirect_to user_photo_users_path(current_user)
    end
  end

  def index

    @user = current_user
  end

  private

  def collect_params

  end

end
