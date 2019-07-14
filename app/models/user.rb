class User < ApplicationRecord
  has_secure_password
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :age, :first_name, :last_name, :password_digest, presence: true
  validates :password, length: { minimum: 6 }, if: -> { new_record? || !password.nil? }

  def admin?
    role == "admin"
  end

  def user?
    role == "user"
  end
end
