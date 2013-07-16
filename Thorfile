require 'json/pure'
require 'uglifier'

class Build < Thor  
  # This is the list of files to concatenate. The first file will appear at the top of the final file. All files are relative to the lib directory.

  FILES = [
    "src/diagram/Global.js", 
    "src/diagram/Util.js", 
    "src/diagram/elements/Element.js", 
    "src/diagram/elements/Scene.js", 
    "src/diagram/elements/OpeningPoint.js",
    "src/diagram/elements/ClosingPoint.js",
    "src/diagram/elements/UbiquitousAccess.js",
    "src/diagram/elements/SystemProcessing.js"
  ]
  

 UNIT_TESTS = [
    "tests/js/unit/sceneTests.js",
    "tests/js/unit/openingPointTests.js",
    "tests/js/unit/closingPointTests.js",
    "tests/js/unit/ubiquitousAccessTests.js",
    "tests/js/unit/systemProcessingTests.js"
 ]


  if !File.directory?("dist")
    puts ":: Creating dist directory..."
    Dir.mkdir("dist")
  end
    
  # dev build
  desc "dev", "Concatenate all the js files into /dist/molic-designer-vVERSION.js."
  def dev(version)

    
    file_name = "dist/molic-designer-v#{version}.js"
    
    puts ":: Deleting other development files..."
    Dir.foreach("dist") do |file|
      if file.match(/.*[^(min)]\.js/)
        File.delete("dist/" + file)
      end
    end
    
    puts ":: Building full source file /#{file_name}..."
    File.open(file_name, "w") do |file|
      file.puts replace_tokens(concatenate, version)
    end
    
    puts "   -> Done!"
  end

  # test build
  desc "test", "Concatenate all the unit test js files into tests/js/unitTests.js"
  def test()

    file_name = "tests/js/unitTests.js"
    
    puts ":: Deleting old unitTests.js..."
    if File.file?("tests/js/unitTests.js")
    File.delete("tests/js/unitTests.js")
  end
  
    puts ":: Building new unitTests.js..."
    File.open(file_name, "w") do |file|
      file.puts concatenateUnitTests
    end
    
    puts "   -> Done!"
  end
  
  #prod build
  desc "prod", "Concatenate all the js files in into /dist/kinetic-vVERSION.min.js and minify it."
  def prod(version)
    file_name = "dist/kinetic-v#{version}.min.js"
    
    puts ":: Deleting other prod files..."
    Dir.foreach("dist") do |file|
      if file.match(/.*min\.js/)
        File.delete("dist/" + file)
      end
    end
    
    puts ":: Building full prod file /#{file_name}..."
    
    
    #build full minfiied prod file
    File.open(file_name, "w") do |file|
      uglify = Uglifier.compile(concatenate())
      uglify.sub!(/\*\/ .+ \*\//xm, "*/")
      file.puts replace_tokens(uglify, version)
    end

    #build modular minified files
    puts ":: Building minified modules..."
    FILES.each do |file|
      content = IO.read(File.expand_path(file)) << "\n"
      mod = File.basename(file)
      mod[".js"] = ""
      module_filename = "dist/kinetic-#{mod}-v#{version}.min.js"
      File.open(module_filename, "w") do |file2|
        uglify = Uglifier.compile(content, :copyright => mod == "Global")
        file2.puts replace_tokens(uglify, version)
      end
    end

    puts "   -> Done!"
  end
  
  private
  
    def concatenate()
      content = ""
      FILES.each do |file|
        content << IO.read(File.expand_path(file)) << "\n"
      end
      
      return content
    end
    
    def concatenateUnitTests()
      content = ""
      UNIT_TESTS.each do |file|
        content << IO.read(File.expand_path(file)) << "\n"
      end
      
      return content
    end
    
    def replace_tokens(content, version) 
      date = Time.now.strftime("%b %d %Y")
      
      content.gsub!("{{version}}", version)
      content.sub!("{{date}}", date)
      content.gsub!("{{NodeParams}}", IO.read("configParams/NodeParams.txt"))
      content.gsub!("{{ContainerParams}}", IO.read("configParams/ContainerParams.txt"))
      content.gsub!("{{ShapeParams}}", IO.read("configParams/ShapeParams.txt"))
      
      return content
    end

end
  
