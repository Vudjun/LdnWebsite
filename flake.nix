{
  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-23.11";
  };

  outputs = { self, nixpkgs, flake-utils }:
    let
      wesbite_overlay = final: prev: {
        ryujinx-ldn-website = with final;
          buildNpmPackage {
            pname = "ryujinx-ldn-website";
            version = "1.0.0";

            src = ./.;

            npmBuildScript = "release";
            npmBuildFlags = [ "--" "--outDir" "dist" ];
            installPhase = ''
              runHook preInstall
              cp -r dist $out/
              cp -r public package.json package-lock.json node_modules $out/

              makeWrapper '${nodejs}/bin/node' "$out/bin/ryujinx-ldn-website" --add-flags "$out/index.js"

              runHook postInstall
            '';

            npmDepsHash = "sha256-Wo4dGsUAZwXbkuWwTKNA5kv4ZUnekdKm/TagP4Q4Ds8=";
          };
      };
    in flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [ self.overlays."${system}" ];
        };
      in {
        packages = {
          default = self.packages.${system}.ryujinx-ldn-website;
          ryujinx-ldn-website = pkgs.ryujinx-ldn-website;
        };

        overlays = wesbite_overlay;
        formatter = pkgs.nixfmt;
      });
}

