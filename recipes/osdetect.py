import logging, os

class OsDetect:

   def __init__(self, buildout, name, options):
       self.name, self.options = name, options
       logging.getLogger(self.name).debug(
           'Using OsDetect.')
       options['kernel'] = self.install()

       if options['kernel'] == 'Darwin':
           options['lib_path'] = "/opt/local"
           logging.getLogger(self.name).info(
               '"lib_path" is %s', options['lib_path'])
           options['make_opt'] = "macosx"
           logging.getLogger(self.name).info(
               '"make_opt" is %s', options['make_opt'])
       else:
           options['lib_path'] = "/usr/local"
           logging.getLogger(self.name).info(
               '"lib_path" is %s', options['lib_path'])
           options['make_opt'] = "linux"
           logging.getLogger(self.name).info(
               '"make_opt" is %s', options['make_opt'])



   def install(self):
       uname = os.uname()[0]
       logging.getLogger(self.name).info(
           'Kernel Name is %s', uname)
       return uname

   def update(self):
       return self.install()
