class Contact < Sinatra::Base

  set :public, Proc.new { File.join(root, "_site") }

  post '/send' do
    if recaptcha_valid?
      session[:captcha] = true
      { :message => 'success' }.to_json
    else
      session[:captcha] = false
      { :message => 'failure' }.to_json
    end
  end

  post '/send_email' do
      require 'pony'
      require 'json'

      if session[:captcha]
        session[:captcha] = false
        res = Pony.mail(
    :from => params[:name] + "<" + params[:email] + ">",
    :to => 'rdmagboo@gmail.com',
    :subject => "Message from" + params[:name],
    :body => params[:tel] + "<br>" + params[:inquiry],
    :port => '587',
    :via => :smtp,
    :via_options => {
      :address              => 'smtp.sendgrid.net',
      :port                 => '587',
      :enable_starttls_auto => true,
      :user_name            => ENV['SENDGRID_USERNAME'],
      :password             => ENV['SENDGRID_PASSWORD'],
      :authentication       => :plain,
      :domain               => 'heroku.com'
    })
        content_type :json
        if res
      { :message => 'success' }.to_json
        else
      { :message => 'failure' }.to_json
        end
      else
        { :message => 'failure' }.to_json
      end
  end

  before do
      response.headers['Cache-Control'] = 'public, max-age=36000'
  end

end