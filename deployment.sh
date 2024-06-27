git clone -b dev --single-branch https://github.com/GrimalDev/outil-digitalisation.git

rsync -ar --inplace ./outil-digitalisation/* root@172.16.0.25:~/app
rsync -ar --inplace ./outil-digitalisation/* root@172.16.0.55:~/app

ssh root@172.16.0.25 'bash ~/app/startup.sh'
ssh root@172.16.0.55 'bash ~/app/startup.sh'

