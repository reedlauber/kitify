class FunnynameController < ApplicationController
  def index
    @name = User.generate_random_name 3
  end
end
