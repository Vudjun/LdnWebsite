{ pkgs ? (import <nixpkgs> {})}:
with pkgs;
with (import (fetchFromGitHub {
  owner = "TSRBerry";
  repo = "pnpm2nix";
  rev = "8df6e2a8bd0174f4e9fa858d37c08ff3e91019bc";
  sha256 = "YhWzfuqNCZmKMbcoDoAT52KodjpuNj/7MklwKD0ojrg=";
}) { inherit pkgs; });


let

  buildPackage = mkPnpmPackage {
    src = nix-gitignore.gitignoreSource [] ./.;

    linkDevDependencies = true;

    postBuild = ''
      cp -R "node_modules/$pname"/* ./

      export PATH="node_modules/.bin:$PATH"

      mkdir -p "$out/dist"

      npm run build -- --outDir "$out/dist"
      mv public package.json pnpm-lock.yaml "$out/"
    '';

    postInstall = ''
      rm -rf "$out/bin" "$lib/node_modules/$pname"
    '';
  };

  package = mkPnpmPackage {
    src = buildPackage;

    postInstall = ''
      mv "$lib/node_modules/$pname/dist" "$lib/node_modules/$pname/public" "$lib/node_modules/$pname/package.json" "$out/"
      rm -rf "$lib/node_modules/$pname"

      ln -s "$lib/node_modules" "$out/node_modules"
      ln -s "$npm_config_nodedir/bin/node" "$out/bin/node"
    '';
  };

in package
